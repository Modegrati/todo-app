import { useEffect, useState } from 'react'

export default function App(){
  const [tasks, setTasks] = useState(()=> JSON.parse(localStorage.getItem('tasks')||'[]'))
  const [text, setText] = useState('')

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])

  const add = ()=>{
    const t = text.trim()
    if(!t) return
    setTasks(prev=> [...prev, { id: Date.now(), text: t, done:false }])
    setText('')
  }

  const toggle = (id)=> setTasks(ts=> ts.map(t=> t.id===id ? {...t, done:!t.done}:t))
  const remove = (id)=> setTasks(ts=> ts.filter(t=> t.id!==id))

  return (
    <div style={{maxWidth:680, margin:'40px auto', padding:'16px', fontFamily:'system-ui, Arial'}}>
      <h1>To‑Do List</h1>
      <div style={{display:'flex', gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add task..." style={{flex:1, padding:8}} />
        <button onClick={add}>Add</button>
      </div>
      <ul style={{listStyle:'none', padding:0}}>
        {tasks.map(t=> (
          <li key={t.id} style={{display:'flex', alignItems:'center', gap:8, padding:'8px 0', borderBottom:'1px solid #eee'}}>
            <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id)} />
            <span style={{textDecoration: t.done?'line-through':'none'}}>{t.text}</span>
            <button onClick={()=>remove(t.id)} style={{marginLeft:'auto'}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
