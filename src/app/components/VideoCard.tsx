import Image from "next/image"

const VideoCard = ({creator, url, title, thumbnail}: {creator: string, url: string, title: string, thumbnail: string }) => {
  return (
    <div className='py-6'>
        <h1 className="text-lg"> {creator} </h1>
        <a className="text-white text-lg" href={url} target="_blank"> {title} </a>
        <img src={thumbnail} width={600} height={350}/>

    </div>
  )
}

export default VideoCard