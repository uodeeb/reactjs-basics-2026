import '../css/main.css'
import NewsCard from '../components/NewsCard'
import { useState } from 'react'



function Main () {
const [state, setState] = useState()



    const props = 
[        {
            title: 'Title 01',
            description: 'Description 01',
            category: 'Category 01',
            url: 'https://www.techifly.com/',
            isFeatured: false,
        },
        {
            title: 'Title 02',
            description: 'Description 02',
            category: 'Category 02',
            url: 'https://www.techifly.com/',
            isFeatured: false,
        },
        {
            title: 'Title 03',
            description: 'Description 03',
            category: 'Category 03',
            url: 'https://www.techifly.com/',
            isFeatured: false,
        },
        {
            title: 'Title 04',
            description: 'Description 04',
            category: 'Category 04',
            url: 'https://www.techifly.com/',
            isFeatured: false,
        },
        {
            title: 'Title 05',
            description: 'Description 05',
            category: 'Category 05',
            url: 'https://www.techifly.com/',
            isFeatured: false,
        },
        {
            title: 'Title 06',
            description: 'Description 06',
            category: 'Category 06',
            url: 'https://www.techifly.com/',
            isFeatured: (state) => state.isFav,
        }   
    ]
    








    return (
        <main id="main">
            {
                props.map(item => <NewsCard 
                    {...item} 
                    key={props.indexOf(item)}
                    isFeatured=
                    
                    />
                )
            }
        </main>
    )
}
export default Main