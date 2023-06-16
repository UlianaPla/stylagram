import { useHttp } from "../hooks/http.hook"

const userId = `ZOa3HudHsi0Eoar4xJeBykUb74T9MDHysDlC6Y4swXg`;

const usePhotosService = ()=>{
    const {request, clearError, process, setProcess} = useHttp();


    const getAllPhotos = async() => {
        const res = await request(`https://api.unsplash.com/search/photos?query=minimal&client_id=${userId}`);
        console.log(res);
        return res.data.results;
    }

    // const _transformCharacter = (char) => {
    //     let formattedDescription =
    //       char.description && char.description.length > 210
    //         ? `${char.description.slice(0, 210)}...`
    //         : char.description;
    
    //     return {
    //       id: char.id,
    //       name: char.name,
    //       description: char.description
    //         ? formattedDescription
    //         : "There is no description fot this character",
    //       thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
    //       homepage: char.urls[0].url,
    //       wiki: char.urls[1].url,
    //       comics: char.comics.items,
    //     };
    //   };

    return {
      process,
      getAllPhotos,
      clearError,
      setProcess,
    };
}
export default usePhotosService;