import '../css/newscard.css'
import { useState } from 'react'
import defaultImg from '../assets/Techifly_logo_org-removebg.png'


function NewsCard ({title, description, category, image}) {

    const [isFavorite, setFavorite] = useState(false)



    const handleFeatured = (e) => {
        // console.log(e.target)
        // e.target.classList.toggle('featured')
        // console.log(e.target.classList.contains('featured'))

        // e.target.classList.contains('featured')? state.isFav = true : state.isFav = false
        // handleFav(state)
        // e.target.textContent = state.isFav ? '♥' : '♡'
        // console.log(isFavorite)
        setFavorite(!isFavorite)
        // console.log(isFavorite)
        !isFavorite ? e.target.classList.add('featured') : e.target.classList.remove('featured')

    }



    return (
        <article className="art__cont">
             <section 
             className="img__cont"
             style={{
                backgroundImage: `${image}`?`url(${image})`:`url(${defaultImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
             }}
             onClick={handleFeatured}
             >
                

            </section>

                <section className="text__cont">
                    <h3 className="art__title">{title}</h3>
                    <p className="art__desc">{description}</p>

                    <div className="btns__cont">
                    <button className="art__btn" onClick={handleFeatured}>
                        {isFavorite ? '♥' : '♡'}
                    </button>
                    <p className="category">{category}</p>
                    </div>

                </section>
                </article>
    )
}
export default NewsCard