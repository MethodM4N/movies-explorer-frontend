
function SearchForm() {
   return (
      <section className="searchForm">
         <form className="searchForm__flex">
            <input className="searchForm__input" placeholder="Фильм" required></input>
            <button className="searchForm__find-button"></button>
         </form>
         <div className="searchForm__filter">
            <label className="searchForm__filter-button">
               <input type="checkbox"></input>
               <span class="searchForm__slider"></span>
            </label>
            <p className="searchForm__button-description">Короткометражки</p>
         </div>
      </section>
   )
}

export default SearchForm;