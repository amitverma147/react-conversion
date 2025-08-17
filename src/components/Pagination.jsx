const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
          data-page={index + 1}
          aria-current={currentPage === index + 1 ? 'page' : 'false'}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </>
  )
}

export default Pagination