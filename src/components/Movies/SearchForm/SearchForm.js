
function SearchForm( { onSearchMovies, onCheckboxClick, isCheckbox, handleChange, searchQuery } ) {

   function handleSearchContent(e) {
      handleChange(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onSearchMovies(searchQuery);
   }

   function handleCheckboxClick(e) {
      onCheckboxClick(e.target.checked);
   }

   return (
      <section className="searchForm" onSubmit={handleSubmit}>
         <form className="searchForm__flex">
            <input className="searchForm__input" placeholder="Фильм" required onInvalid={e => e.target.setCustomValidity("Нужно ввести ключевое слово")} onChange={handleSearchContent} value={searchQuery || ''}></input>
            <button className="searchForm__find-button"></button>
         </form>
         <div className="searchForm__filter">
            <label className="searchForm__filter-button">
               <input type="checkbox" defaultChecked={isCheckbox} onClick={handleCheckboxClick}></input>
               <span className="searchForm__slider"></span>
            </label>
            <p className="searchForm__button-description">Короткометражки</p>
         </div>
      </section>
   )
}

export default SearchForm;