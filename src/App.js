import { useStore } from './store';
import { useEffect, useRef, useState } from 'react';
import './a.scss';

function App() {
  const elInput = useRef();
  const elButton = useRef();
  const [id, setId] = useState('')

  const { data, getData, status, postData, deleteData, putData } = useStore();
  useEffect(() => { getData() }, [])

  if (!status) return <>Loading...</>

  // request.get('/')
  // .then(res=>{
  //   console.log(res.data)
  // })

  // request.post('/', {id:Date.now(),name:'홍길순'})
  // .then(res=>{
  //   console.log(res.data)
  // })

  // request.delete('/1705547023702')
  // .then(res=>{
  //   console.log(res.data)
  // })

  // request.put('/',{ id:1705549116723 ,name:"바바"})
  // .then(res=>{
  //   console.log(res.data)
  // })

  let postpunData = (e) => {
    if (elButton.current.innerHTML === '저장') {
      postData(e)

    } else if (elButton.current.innerHTML === '수정') {
      putData(id, e)

    }
  }


  return (
    <div>
      <article>
        <div className='input_box'>
          <input type='text' ref={elInput}
            onChange={() => {
            }}
          />
          <button ref={elButton} onClick={() => (postpunData(elInput.current.value),
            elButton.current.innerHTML = '저장',
            elInput.current.value = ''
          )}>저장</button>
        </div>
        <h2>리스트</h2>
        <ol>
          {data.map((obj,k) => (
            <li key={obj.id}>

              <p>{`${k+1} )`} {obj.name}</p>
              <div className='button_box'>
              <button onClick={() => { deleteData(obj.id) }}>삭제</button>
              <button onClick={() => { setId(obj.id); elButton.current.innerHTML = '수정' }}>수정</button>
              </div>
            </li>
          ))
          }
        </ol>

      </article>
    </div>
  );
}

export default App;
