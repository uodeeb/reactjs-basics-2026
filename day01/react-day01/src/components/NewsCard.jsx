import '../css/newscard.css'



function NewsCard ({title, description, category}) {

    let state = {
        isFav: false,
    }

    const handleFeatured = (e) => {
        console.log(e.target)
        e.target.classList.toggle('featured')
        console.log(e.target.classList.contains('featured'))

        e.target.classList.contains('featured')? state.isFav = true : state.isFav = false
        handleFav(state)
        e.target.textContent = state.isFav ? '♥' : '♡'

    }

const handleFav = (state) => {
    console.log(state)
}

    return (
        <article>
             <section className="img__cont">
           
            </section>

                <section className="text__cont">
                    <h3 className="art__title">{title}</h3>
                    <p className="art__desc">{description}</p>

                    <div className="btns__cont">
                    <button className="art__btn" onClick={handleFeatured}>
                        ♥ Featured
                    </button>
                    <p className="category">{category}</p>
                    </div>

                </section>
                </article>
    )
}
export default NewsCard