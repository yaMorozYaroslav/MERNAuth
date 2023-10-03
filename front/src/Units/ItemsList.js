import React,{useContext} from 'react'
import CircleLoader from "react-spinners/CircleLoader";
import {ItemExcerpt} from './ItemExcerpt'

import {ItemContext} from '../Context/Contexts'
import {FiltContext} from '../Context/Contexts'
import {OpenContext,
	    UserContext,
	    CartContext} from '../Context/Contexts'

import {Row, Col} from 'antd'   
   
export const ItemsList = () => {
	
	const {items, loading, error, fetchItems, single, setSingle, singleId,
		   removeItem, setCurrentId, setSingleId} = useContext(ItemContext)
		  
    const {addToCart} = useContext(CartContext)
    
    const {state} = useContext(FiltContext)

    const {userData} = useContext(UserContext)
    
    const {openItemForm} = useContext(OpenContext)
    
    const currItem = items.data && items.data.find((item) => item._id === singleId)
    
    const category = state.itemCategory
    const type = state.itemType
    const search = state.itemSearch
    /*
	const minPrice = state.itemPrice.min
	const maxPrice = state.itemPrice.max
	
	const sortedByDate = items.slice().sort((a, b) =>
		                                   b.date.localeCompare(a.date))
	
	const sortedByPrice = sortedByDate.sort((a,b) => a.price - b.price)

	const filteredByPrice = sortedByPrice.filter(item => {
		if( minPrice > 0 && !maxPrice){
			 return item.price > parseInt(minPrice)}
		if( maxPrice > 0 && !minPrice){
			return item.price < parseInt(maxPrice)}
		if( maxPrice > 0 && minPrice > 0){
			return item.price > parseInt(minPrice) && item.price < parseInt(maxPrice)}
		return item
		}) 
}
  
   */
   const [page, setPage] = React.useState(1)
 
	 React.useEffect(()=> {
		// console.log(error) 
		 if(!items.data && !loading && !error.length){
			  setPage(1)
			 fetchItems(category, type,1)
			 }  
		
		  },[fetchItems, category,type, items, loading, page, error.length]) 
	   
	//React.useEffect(()=> {
	//	 if(items.data&&search&&!loading)fetchItems(
	//	                                      category, type, 1, search)
	//	 },[search, items.data, loading, fetchItems, category, type])
		 
		const Buttons = () => <div style={{'display':'flex', 'fontSize':'20px'}}>Pages:{[...Array(items.totalPages)].map((e, i) => 
	   <button style={{'margin':'5px', 'fontSize':'20px', 'cursor':'pointer'}} onClick={()=>fetchItems(category,type, i+1)} key={i}>{i+1}</button>)}</div>

	
	let content
	
	if(loading){
		
		content = <section style={{textAlign:'center'}}>
		<h1>Let me upload the products</h1>
		<CircleLoader
        
        cssOverride={{marginLeft:'43%', marginTop: '5%'}}
        color={'#901031'}
        size={180}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></section>
		
	}
	if (!loading&&items.data){

		content = 
  
      <>
       <Buttons/>
      <Row gutter={[12, 12]}>
       {items.data.map(item => (
			  <Col key={item._id}  span={6}> 
			   <ItemExcerpt  
			           item={item}
			           setSingle={setSingle}
			           setCurrentId={setCurrentId}
			           setSingleId={setSingleId}
			           openItemForm={openItemForm}
			           removeItem={removeItem}
			           userData={userData}
			           addToCart={addToCart}
			            />
			  </Col>
		       ))}
			  </Row>
	  </>
		}
		
	if (!loading&&items.data&&single){

		content = <><ItemExcerpt item={currItem}
		                         single={single}
		                         setSingleId={setSingleId}
		                         setSingle={setSingle}
			                     setCurrentId={setCurrentId}
			                     openItemForm={openItemForm}
			                     removeItem={removeItem}
			                     userData={userData}
			                     addToCart={addToCart}/></>
 }
	if(items.data&&!items.data.length && !loading) {content = 
		 <section style={{textAlign:'center', margin: '60px', fontSize:'30px'}}>
		                There are no products matching your request.</section>}
		 
	
	if(error.length) {content = 
		 <section style={{textAlign:'center', margin: '60px', fontSize:'30px'}}>
		                {error}</section>}
		 return(
		    <section>
		       {content}
		    </section>
		 )
	}
