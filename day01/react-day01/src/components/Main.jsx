import '../css/main.css'
import NewsCard from '../components/NewsCard'
import { useState } from 'react'
import { useEffect } from 'react'


function Main () {

const [news, setNews] = useState([])
const [options, setOptions] = useState({
    page_number: 3,
    page_size: 10,
    keywords: "",
    language: "en",
})

    console.log(news)
// console.log(news)
   //     const [search, setSearch] = useState('')
//     const [password, setPassword] = useState('')
//     const [name, setName] = useState('')
    const [err, setErr] = useState('')
//     const props = 
// [        {
//             title: 'Title 01',
//             description: 'Description 01',
//             category: 'Category 01',
//             url: 'https://www.techifly.com/',
//             isFeatured: false,
//         },
//         {
//             title: 'Title 02',
//             description: 'Description 02',
//             category: 'Category 02',
//             url: 'https://www.techifly.com/',
//             isFeatured: false,
//         },
//         {
//             title: 'Title 03',
//             description: 'Description 03',
//             category: 'Category 03',
//             url: 'https://www.techifly.com/',
//             isFeatured: false,
//         },
//         {
//             title: 'Title 04',
//             description: 'Description 04',
//             category: 'Category 04',
//             url: 'https://www.techifly.com/',
//             isFeatured: false,
//         },
//         {
//             title: 'Title 05',
//             description: 'Description 05',
//             category: 'Category 05',
//             url: 'https://www.techifly.com/',
//             isFeatured: false,
//         },
//         {
//             title: 'Title 06',
//             description: 'Description 06',
//             category: 'Category 06',
//             url: 'https://www.techifly.com/',
//             isFeatured: (state) => state.isFav,
//         }   
//     ]
    
// const handleSearch = (e) => {

//     setSearch(e.target.value)
//     console.log(search)
// }

// const handlePassword = (e) => {
//     setPassword(e.target.value)
//     // console.log(password)
// }

// const handleName = (e) => {
//     setName(e.target.value)
//     // console.log(name)
// }

// const handleSubmit = (e) => {
//     e.preventDefault()
//     if (name.trim() === '' || password.trim() === '') {
//         setErr('Please fill in all fields')
//         console.log(err)
//         return
//     }
//     setErr('')
//     console.log(name, password)
// }


    console.log(news)

useEffect(() => {

   async function getApiNews () {
        try{
         const API_KEY = 'zof9YfvPBwqxZuxm5xq3-WMyC-uSETnovJpCg3KjjrvT2ZSg';
    const searchEndPoint= 'https://api.currentsapi.services/v1/search?'
    // console.log(options)
    
    const res = await fetch(
    `${searchEndPoint}keywords=${options.keywords}&language=${options.language}&page_number=${options.page_number}&page_size=${options.page_size}`,{headers: { Authorization: "Bearer " + API_KEY }
})
    // console.log(res)
    const data = await res.json()
    if (data.news) {
        setNews(data.news)
    }
    console.log(options)
    }catch(err){
        console.log(err)
        setErr("unable to fetch news, please try again")
    }
   
}
getApiNews()
}, [options])





    return (
        <main id="main">
            {/* {
                props.map(item => <NewsCard 
                    {...item} 
                    key={props.indexOf(item)}

                    
                    />
                )
)            } */}
            {/* <input 
            type="text" 
            placeholder="Search" 
            style={{
                width: '300px',
                margin: '20px 0',
                padding: '10px',
                height: '40px',
            }}
            onChange={handleSearch}
            /> */}
            {/* <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Name" 
                style={{
                    width: '300px',
                    margin: '20px 0',
                    padding: '10px',
                    height: '40px',
                }}
                onChange={e => setName(e.target.value)}
                // value={name}
                />
                                <input 
                type="text" 
                placeholder="Password" 
                style={{
                    width: '300px',
                    margin: '20px 0',
                    padding: '10px',
                    height: '40px',
                }}
                onChange={e => setPassword(e.target.value)}
                // value={password}
                />
            <button 
            type="submit"
            >
                ...Login...
                </button>
                {err && <p>{err}</p>}
            </form> */}
            <section className="tabs__cont">

                <button 
                className="tabs__btn"
                onClick={() => setOptions({...options, keywords: 'technology'})}
                
                >Technology
                </button>
                <button 
                className="tabs__btn"
                onClick={() => setOptions({...options, keywords: 'business'})}
                >
                    Business</button>
                <button 
                className="tabs__btn"
                onClick={() => setOptions({...options, keywords: 'entertainment'})}
                >
                    Entertainment</button>
                <button 
                className="tabs__btn"
                onClick={() => setOptions({...options, keywords: 'health'})}
                >
                    Health</button> 
                <button 
                className="tabs__btn"
                onClick={() => setOptions({...options, keywords: 'science'})}
                >
                    Science</button>
                <button 
                className="tabs__btn"
                onClick={() => setOptions({...options, keywords: 'sports'})}
                >
                    Sports</button> 
            </section>
            <section className="news__cont">
                {
                    news.map(item => <NewsCard 
                        {...item} 
                        key={news.indexOf(item)}
                        />
                    )
                }
            </section>
        </main>
    )
}
export default Main