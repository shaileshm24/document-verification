// frontend/src/component/DocumentInsightCard.jsx
// Rich per-document card surfacing every analysis signal:
//   • Extracted fields (from Claude OCR)
//   • Claude forgery flags + authenticity score + notes
//   • EXIF analysis (flags + metadata)
//   • Aadhaar QR verification (cross-check + mismatches)

const DOC_META = {
  aadhaar:          { label: 'Aadhaar Card',      icon: '🪪' },
  pan:              { label: 'PAN Card',          icon: '💳' },
  itr:              { label: 'ITR Filing',        icon: '📄' },
  employmentLetter: { label: 'Employment Letter', icon: '🏢' },
};

const FLAG_LABELS = {
  FONT_INCONSISTENCY:        'Fonts inconsistent with template',
  QR_SUSPICIOUS:             'QR code appears modified',
  PHOTO_MANIPULATION:        'Photo shows signs of editing',
  ALIGNMENT_ISSUES:          'Text alignment issues',
  COLOR_INCONSISTENCY:       'Color palette mismatch',
  PIXELATION_AROUND_TEXT:    'Unusual pixelation around text',
  METADATA_MISMATCH:         'Document metadata inconsistent',
  INCORRECT_PAN_FORMAT:      'Invalid PAN number format',
  MISSING_HOLOGRAM:          'IT Dept hologram missing/altered',
  BACKGROUND_TAMPERING:      'Background pattern irregular',
  INCOME_SUSPICIOUSLY_ROUND: 'Suspiciously round income figure',
  MISSING_ACKNOWLEDGEMENT:   'Acknowledgement number missing',
  FONT_MISMATCH:             'Font mismatch with template',
  INCORRECT_ASSESSMENT_YEAR: 'Assessment year incorrect',
  COMPUTATION_ERROR:         'Tax computation error',
  GENERIC_TEMPLATE:          'Matches known forged template',
  INVALID_GST_FORMAT:        'GST number format invalid',
  NO_COMPANY_STAMP:          'Missing company stamp/seal',
  SALARY_INCONSISTENT_WITH_DESIGNATION: 'Salary inconsistent with role',
  MISSING_LETTERHEAD:        'Missing letterhead',
  SUSPICIOUS_FONT:           'Suspicious font usage',
  NO_HR_CONTACT:             'No HR contact details',
  ROUND_SALARY_FIGURES:      'Suspiciously round salary figures',
  EDITED_IN_PHOTOSHOP:       'EXIF: edited in Adobe Photoshop',
  EDITED_IN_GIMP:            'EXIF: edited in GIMP',
  EDITED_IN_PAINT:           'EXIF: edited in image editor',
  NO_CAMERA_INFO_BUT_HAS_SOFTWARE: 'EXIF: software present but no camera',
  TIMESTAMP_FUTURE:          'EXIF: timestamp is in the future',
  MODIFIED_AFTER_CREATION:   'EXIF: file modified after creation',
  NO_EXIF_METADATA:          'No EXIF metadata (re-saved/screenshot)',
  EXIF_PARSE_FAILED:         'EXIF parse failed',
  QR_OCR_MISMATCH:           'QR data does not match printed text',
  QR_NOT_FOUND:              'No QR code detected',
  QR_VERIFICATION_ERROR:     'QR verification error',
  DOCUMENT_UNREADABLE:       'Document could not be read',
};

const FIELD_LABELS = {
  // Aadhaar
  name: 'Name', dob: 'DOB', gender: 'Gender', uid: 'UID', pincode: 'PIN',
  address: 'Address', fatherName: 'Father',
  // PAN
  pan: 'PAN', hasPhoto: 'Photo on card', hasSignature: 'Signature on card',
  hasHologram: 'IT Dept hologram',
  // ITR
  assessmentYear: 'Assessment year', annualIncome: 'Annual income',
  taxPaid: 'Tax paid', filingDate: 'Filing date', form: 'ITR form',
  acknowledgementNo: 'Acknowledgement #', acknowledgementNumber: 'Acknowledgement #',
  // Employment letter
  employerName: 'Employer', employerAddress: 'Employer address',
  gstNumber: 'GST', cinNumber: 'CIN', designation: 'Designation',
  monthlySalary: 'Monthly salary', annualCtc: 'Annual CTC',
  joiningDate: 'Joining date', issueDate: 'Issue date',
  hrSignatory: 'HR signatory', hasCompanyStamp: 'Company stamp',
  hasLetterhead: 'Has letterhead',
  // Generic
  employeeName: 'Employee', employeeId: 'Employee ID',
};

// Convert any unmapped camelCase key (e.g. "fatherName") into a readable label
// so newly-added OCR fields show up gracefully without code changes.
function humanizeKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, c => c.toUpperCase())
    .trim();
}

function formatValue(key, val) {
  if (val == null || val === '') return '—';
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (key === 'monthlySalary' || key === 'annualIncome' ||
      key === 'annualCtc' || key === 'taxPaid') {
    return '₹ ' + Number(val).toLocaleString('en-IN');
  }
  return String(val);
}

function statusFromResult(result) {
  if (!result || result.error) return 'error';
  const flags = result.analysis?.forgeryFlags?.length || 0;
  const exif  = result.exifAnalysis?.flags?.filter(f => f !== 'NO_EXIF_METADATA').length || 0;
  const qrBad = result.qrVerification && (!result.qrVerification.qrFound || result.qrVerification.crossCheck?.mismatches?.length > 0);
  const score = result.analysis?.authenticityScore ?? 1;
  if (flags > 0 || qrBad || score < 0.6) return 'fail';
  if (exif > 0 || score < 0.85) return 'warn';
  return 'clean';
}

function authBarColor(pct) {
  if (pct >= 80) return 'var(--c-pass)';
  if (pct >= 50) return 'var(--c-warn)';
  return 'var(--c-fail)';
}

export function DocumentInsightCard({ docType, result, document }) {
  const meta = DOC_META[docType] || { label: docType, icon: '📋' };
  const status = statusFromResult(result);
  const headLabels = { clean: 'AUTHENTIC', warn: 'WARNINGS', fail: 'SUSPICIOUS', error: 'UNREADABLE' };

  if (!result || result.error) {
    return (
      <div className="lfd-doc error">
        <div className="lfd-doc-head">
          <span className="icon">{meta.icon}</span>
          <div className="title"><div className="name">{meta.label}</div></div>
          <span className="lfd-pill fail">{headLabels.error}</span>
        </div>
        {document && <DocumentPreview document={document} />}
        <div className="lfd-doc-body">
          <div className="lfd-flag">⚠ {result?.error || 'Analysis failed'}</div>
        </div>
      </div>
    );
  }

  const { extracted = {}, analysis = {}, exifAnalysis, qrVerification, mimeType } = result;
  const flags    = analysis.forgeryFlags || [];
  const authPct  = Math.round((analysis.authenticityScore ?? 1) * 100);

  return (
    <div className={`lfd-doc ${status}`}>
      <div className="lfd-doc-head">
        <span className="icon">{meta.icon}</span>
        <div className="title">
          <div className="name">{meta.label}</div>
          <div className="mime">{document?.originalFilename || mimeType || '—'}</div>
        </div>
        <span className={`lfd-pill ${status === 'clean' ? 'pass' : status === 'warn' ? 'warn' : 'fail'}`}>
          {headLabels[status]}
        </span>
      </div>

      {document && <DocumentPreview document={document} />}

      <div className="lfd-doc-body">
        {/* Authenticity */}
        <div className="lfd-section">
          <div className="lfd-section-title">Authenticity (Claude Vision)</div>
          <div className="lfd-auth-bar">
            <div className="track">
              <div className="fill" style={{ width: `${authPct}%`, background: authBarColor(authPct) }} />
            </div>
            <span className="val" style={{ color: authBarColor(authPct) }}>{authPct}%</span>
          </div>
          {analysis.confidence != null && (
            <div style={{ fontSize: 11, color: 'var(--c-text-3)', marginTop: 4 }}>
              Model confidence: {Math.round(analysis.confidence * 100)}%
            </div>
          )}
        </div>

        {/* Extracted fields (humanized OCR output) */}
        {Object.keys(extracted).length > 0 && (
          <div className="lfd-section">
            <div className="lfd-section-title">
              OCR Extracted Fields
              <span className="lfd-section-meta">{Object.keys(extracted).length} field{Object.keys(extracted).length === 1 ? '' : 's'}</span>
            </div>
            <div className="lfd-fields">
              {Object.entries(extracted).map(([k, v]) =>
                v == null || v === '' ? null : (
                  <Row key={k} k={FIELD_LABELS[k] || humanizeKey(k)} v={formatValue(k, v)} />
                )
              )}
            </div>
          </div>
        )}

        {/* Raw OCR response — full JSON returned by Claude Vision for this doc */}
        {(Object.keys(extracted).length > 0 || analysis) && (
          <details className="lfd-section lfd-ocr-raw">
            <summary>
              <span className="lfd-section-title-inline">View raw OCR response</span>
              <span className="lfd-section-meta">Claude Vision JSON</span>
            </summary>
            <pre className="lfd-json">{JSON.stringify({ extracted, analysis }, null, 2)}</pre>
          </details>
        )}

        {/* Claude forgery flags */}
        {flags.length > 0 && (
          <div className="lfd-section">
            <div className="lfd-section-title">AI-detected Issues ({flags.length})</div>
            <div className="lfd-flag-list">
              {flags.map((f, i) => (
                <div key={i} className="lfd-flag">
                  <span>⚠</span>
                  <div style={{ flex: 1 }}>
                    <div>{FLAG_LABELS[f] || f}</div>
                    <div className="code">{f}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXIF analysis (image docs only) */}
        {exifAnalysis && (
          <div className="lfd-section">
            <div className="lfd-section-title">EXIF Forensics</div>
            <ExifBlock exif={exifAnalysis} />
          </div>
        )}

        {/* QR verification (Aadhaar only) */}
        {qrVerification && (
          <div className="lfd-section">
            <div className="lfd-section-title">UIDAI QR Verification</div>
            <QRBlock qr={qrVerification} />
          </div>
        )}

        {/* Claude notes */}
        {analysis.notes && (
          <div className="lfd-section">
            <div className="lfd-section-title">Analyst Notes</div>
            <div className="lfd-note">{analysis.notes}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <>
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </>
  );
}

function ExifBlock({ exif }) {
  const flags = exif.flags || [];
  const realFlags = flags.filter(f => f !== 'NO_EXIF_METADATA');
  const pill = realFlags.length > 0 ? 'fail' : flags.includes('NO_EXIF_METADATA') ? 'warn' : 'pass';
  const pillLabel = realFlags.length > 0 ? `${realFlags.length} flag${realFlags.length > 1 ? 's' : ''}` : flags.includes('NO_EXIF_METADATA') ? 'No EXIF' : 'Clean';

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span className={`lfd-pill ${pill}`}>{pillLabel}</span>
        <span style={{ fontSize: 11, color: 'var(--c-text-3)' }}>{exif.summary || ''}</span>
      </div>

      {exif.metadata && (
        <div className="lfd-fields">
          {exif.metadata.cameraMake   && <Row k="Camera"    v={`${exif.metadata.cameraMake} ${exif.metadata.cameraModel || ''}`.trim()} />}
          {Array.isArray(exif.metadata.software) && exif.metadata.software.length > 0 && (
            <Row k="Software" v={exif.metadata.software.join(', ')} />
          )}
          {exif.metadata.dateTimeOriginal && <Row k="Captured" v={exif.metadata.dateTimeOriginal} />}
          {exif.metadata.dateTimeModified && <Row k="Modified" v={exif.metadata.dateTimeModified} />}
        </div>
      )}

      {flags.length > 0 && (
        <div className="lfd-flag-list" style={{ marginTop: 8 }}>
          {flags.map((f, i) => (
            <div key={i} className={`lfd-flag ${f === 'NO_EXIF_METADATA' ? 'warn' : ''}`}>
              <span>{f === 'NO_EXIF_METADATA' ? 'ℹ' : '⚠'}</span>
              <div style={{ flex: 1 }}>
                <div>{FLAG_LABELS[f] || f}</div>
                <div className="code">{f}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function QRBlock({ qr }) {
  if (!qr.qrFound) {
    return (
      <>
        <span className="lfd-pill fail">QR Not Found</span>
        <div className="lfd-note" style={{ marginTop: 8 }}>
          Genuine Aadhaar cards always carry a UIDAI-signed QR code. Its absence is a strong tampering signal.
        </div>
      </>
    );
  }

  const mismatches = qr.crossCheck?.mismatches || [];
  const matched = qr.crossCheck?.checks?.filter(c => c.match) || [];
  const matchPill = mismatches.length === 0 ? 'pass' : 'fail';
  const matchLabel = mismatches.length === 0 ? 'QR matches printed text' : `${mismatches.length} mismatch${mismatches.length > 1 ? 'es' : ''}`;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <span className="lfd-pill pass">QR Detected</span>
        <span className="lfd-pill muted">{qr.qrType}</span>
        <span className={`lfd-pill ${matchPill}`}>{matchLabel}</span>
      </div>

      {qr.extracted && (
        <div className="lfd-fields">
          {qr.extracted.name      && <Row k="QR Name"   v={qr.extracted.name} />}
          {qr.extracted.uidLast4  && <Row k="QR UID*"   v={`XXXX XXXX ${qr.extracted.uidLast4}`} />}
          {qr.extracted.yearOfBirth && <Row k="QR YOB"  v={qr.extracted.yearOfBirth} />}
          {qr.extracted.gender    && <Row k="QR Gender" v={qr.extracted.gender} />}
          {qr.extracted.pincode   && <Row k="QR PIN"    v={qr.extracted.pincode} />}
        </div>
      )}

      {mismatches.length > 0 && (
        <div className="lfd-flag-list" style={{ marginTop: 8 }}>
          {mismatches.map((m, i) => (
            <div key={i} className="lfd-flag">
              <span>⚠</span>
              <div style={{ flex: 1 }}>
                <div>Field <strong>{m}</strong> differs between QR and printed text</div>
                <div className="code">QR_OCR_MISMATCH · {m}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {matched.length > 0 && mismatches.length === 0 && (
        <div style={{ fontSize: 11, color: 'var(--c-text-3)', marginTop: 6 }}>
          ✓ Matched fields: {matched.map(c => c.field).join(', ')}
        </div>
      )}
    </>
  );
}


// ─── DOCUMENT PREVIEW ───────────────────────────────────
// Renders the uploaded file inline: image thumbnail for images,
// embedded viewer for PDFs. File is streamed via the backend proxy
// so it works for both real GCS and fake-gcs locally.
const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/api\/?$/, '');

function DocumentPreview({ document }) {
  const { fileUrl, mimeType, originalFilename, sizeBytes } = document;
  if (!fileUrl) return null;

  const absoluteUrl = fileUrl.startsWith('http') ? fileUrl : `${API_ORIGIN}${fileUrl}`;
  const isImage = mimeType?.startsWith('image/');
  const isPdf   = mimeType === 'application/pdf';
  const sizeKB  = sizeBytes ? `${(sizeBytes / 1024).toFixed(0)} KB` : '';

  return (
    <div className="lfd-doc-preview">
      {isImage && (
        <a href={absoluteUrl} target="_blank" rel="noopener noreferrer" className="thumb">
          <img src={absoluteUrl} alt={originalFilename} loading="lazy" />
        </a>
      )}
      {isPdf && (
        <a href={absoluteUrl} target="_blank" rel="noopener noreferrer" className="thumb pdf">
          <div className="pdf-icon">📄 PDF</div>
        </a>
      )}
      <div className="meta">
        <div className="filename" title={originalFilename}>{originalFilename}</div>
        <div className="sub">
          {mimeType || '—'}{sizeKB ? ` · ${sizeKB}` : ''}
          {' · '}
          <a href={absoluteUrl} target="_blank" rel="noopener noreferrer">Open original ↗</a>
        </div>
      </div>
    </div>
  );
}
