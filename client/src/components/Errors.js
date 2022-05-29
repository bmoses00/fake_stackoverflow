import React from 'react'

function Errors({model, setCurrentPage}) {
  let unique_errors = [...new Set(model.errors)];
  return (
    <>
    {
      (model.current_page === model.Pages.Display_Questions && unique_errors.some(error => error.includes(500) || error.includes(401) || error.includes("Network Error")))
      ? <button className="btn" onClick={() => setCurrentPage(model.Pages.Welcome)}>Back to Welcome</button>
      : ''

    }
      {unique_errors.map((error, index) => {
				return <div className="error" key={index}>{error}</div>
			})
			}
    </>
  )
}

export default Errors