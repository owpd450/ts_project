import React, { useState } from 'react';
import './App.css';

// 定义Todo项的类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // 状态管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // 添加新任务
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(), // 简单的ID生成方式
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue(''); // 清空输入框
    }
  };

  // 删除任务
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 切换任务完成状态
  const toggleTodo = (id: number) => {
    setTodos(
        todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
  };

  // 处理回车键添加任务
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
      <div className="App">
        <div className="todo-container">
          <h1>我的待办事项</h1>

          {/* 输入区域 */}
          <div className="input-section">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入新的待办事项..."
            />
            <button onClick={addTodo}>添加</button>
          </div>

          {/* 任务列表 */}
          <div className="todo-list">
            {todos.length === 0 ? (
                <p className="empty-message">暂无待办事项</p>
            ) : (
                <ul>
                  {todos.map(todo => (
                      <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.text}</span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="delete-btn"
                        >
                          删除
                        </button>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          {/* 统计信息 */}
          <div className="stats">
            <p>总计: {todos.length} 项 |
              已完成: {todos.filter(todo => todo.completed).length} 项</p>
          </div>
        </div>
      </div>
  );
}

export default App;