import React from 'react'
import {get} from '@/lib/pages'

/*export async function generateMetadata({ params }) {

  const page = Data('pages', (await params).slug); // Función ficticia para obtener datos

  return {
    title: page.title,
    description: page.body,
    openGraph: {
      title: page.title,
      description: page.body,
      images: page.thumbnail,
      url: `https://rimaymanta.com/${page.thumbnail}`
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.body,
      images: page.thumbnail
    }
  }
}*/

export default async function Page({ params, searchParams }) {

  try {

    const page = get((await params).slug)

    if (!page) {
      throw new Error('Imash Illan kaypi 404.')
    }

    return <div className='container'>
      <div className='content'>
        <h2 className='page-title'>{page.title}</h2>
        {function () {
          if (page.media) {
            return <div className='row'></div>
          }
        }()}
        <div className='row'>
          <div className='page-body' dangerouslySetInnerHTML={{ __html: page.body }} />
        </div>
      </div>
    </div>

  } catch (e) {
    return <div className='container'>
      <div className='content'>
        <h4>{e.message}</h4>
      </div>
    </div>
  }

}