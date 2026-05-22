import { useEffect, useState, useCallback } from 'react'
import LoanAnalysisDashboard from './pages/LoanAnalysisDashboard'
import LoanListPage from './pages/LoanListPage'

// Tiny URL-driven router: ?loanId=<id> opens the analysis dashboard, otherwise
// show the loan list. Using URL state keeps deep-links shareable without a
// router dependency.
function getLoanIdFromUrl() {
  return new URLSearchParams(window.location.search).get('loanId')
}

function App() {
  const [loanId, setLoanId] = useState(getLoanIdFromUrl())

  // Keep state in sync with browser back/forward navigation.
  useEffect(() => {
    const onPop = () => setLoanId(getLoanIdFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const openLoan = useCallback((id) => {
    const url = new URL(window.location.href)
    url.searchParams.set('loanId', id)
    window.history.pushState({}, '', url)
    setLoanId(id)
  }, [])

  const backToList = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('loanId')
    window.history.pushState({}, '', url)
    setLoanId(null)
  }, [])

  if (loanId) {
    return <LoanAnalysisDashboard loanId={loanId} onBack={backToList} />
  }
  return <LoanListPage onOpenLoan={openLoan} />
}

export default App
