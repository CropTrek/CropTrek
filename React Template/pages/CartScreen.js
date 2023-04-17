import {useDispatch} from 'react-redux';
import ScrollTop from './../src/layouts/ScrollTop';
const cartScreen=({match,location})=>{
    window.scrollTo(0,0);
    const productId=match.params.id;
    const qty=location.search?Number(location.search.split('=')[1]):1;
    const dispatch=useDispatch();
   useEffect(()=>{
if(productId){
    dispatch(addTo)
}   
}) 

}
