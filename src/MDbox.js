import './css/App.css';
import React, {useState} from "react";
import DOMPurify from 'dompurify';
import marked from 'marked';

function MDPreviewer() {
  
  const [mdText, setmdText] = useState('')
  const [btnText, setBtnText] = useState('Preview')
    
  // useEffect(()=>{
  //   console.log(mdText)
  // },[mdText])
  
  const btnChange = ()=>{

    const prevBox = document.querySelector('#prev-box');

    if( btnText === 'Preview' ){
      console.log('btn pressed with prev as tite' + mdText)
      
      convertMDtoHTML(mdText).then( (content)=> {
        document.querySelector('#prev-container').innerHTML = content;
      });

      document.querySelector('#md-editor').classList.add('inactive');
      setBtnText('Edit');
      prevBox.classList.remove('inactive');

    } else {
      
      document.querySelector('#md-editor').classList.remove('inactive');
      prevBox.classList.add('inactive');
      setBtnText('Preview');

    }
  }


  async function convertMDtoHTML(md){

    if(!md){return 'Nothing to show here'}
    
    const options = {
      gfm: true,
      breaks: true
    }
    
    return DOMPurify.sanitize(marked.parse( md, options ));
  
  }

  return (

    <div className="main-app">
      
      <button aria-label="preview" id="btn-swap" onClick={btnChange}>
         {btnText}
      </button>
      
      <textarea aria-label="Markdown Entry"
                name="md-input" 
                id="md-editor" cols="80" 
                rows="30" 
                placeholder=""
                onInput={ (e)=> setmdText( e.target.value ) }>
                  {mdText}
                </textarea>
      <div className="inactive" id="prev-box">
        <div id="prev-container"></div>
      </div>

    </div>
  );
}

export default MDPreviewer;
