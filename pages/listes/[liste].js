import React from 'react'
import styles from '../../styles/Home.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

export default function liste(props) {

    //console.log(props)
    const router = useRouter()

    if (!props.listeEnCours) {
        return <h1>Chargment en cours</h1>
    }
    
    return (
        <div className="container">
            <h1 className={styles.titre}>{router.query.liste.charAt(0).toUpperCase()+router.query.liste.slice(1)}</h1>
            <table className={styles.tableau}>
                <tbody>
                    {props.listeEnCours.map(el => (
                        <tr key={uuidv4()}>
                            <td>{el.en}</td>
                            <td>{el.fr}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export async function getStaticProps(context) {
    const slug = context.params.liste
    const data = await import('/data/listes.json')

    const listeEnCours = data.englishList.find(list => list.name === slug)

if (!listeEnCours) {
    return {
        notFound:true
    }
}

    return {
        props: {
            listeEnCours: listeEnCours.data
        }

    }

}

export async function getStaticPaths() {
    const data = await import('/data/listes.json')

    const paths = data.englishList.map(item => ({
        params:{liste:item.name}
    }))

    return {
        paths: [
            { params: { liste: "words" } },
            { params: { liste: "adjectives" } },
            { params: { liste: "verbs" } },
        ],
        paths,
        fallback: false

    }
}