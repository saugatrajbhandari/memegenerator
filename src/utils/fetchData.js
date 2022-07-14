export const fetchData = async(url) =>{
    const response = await fetch(url);
    const data = await response.json();
    const data3 = data.data.memes;
    return data3;
}

