const getItems = () => {
    let name = JSON.parse(localStorage.getItem('login'));
    let list = localStorage.getItem(name[0]);
    // console.log(typeof list);
    if(list){
        return JSON.parse(localStorage.getItem(name[0]))
    }else{
        return [];
    }    
}

export default getItems;