import './App.css'
import styles from './assets/app.module.css'
import {useState} from "react";


export function App() {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const onInputButtonClick = () => {
        const promptValue = prompt();
        if (promptValue.length < 3) {
            setError('Введенное значение должно содержать минимум 3 символа')
            setIsValid(false)
        } else {
            setValue(promptValue);
            setError('');
            setIsValid(true)
        }
    }

    const onAddButtonClick = () => {
        if (value.length >= 3) {
            const id = Date.now();
            const date = new Date();
            const [y, m, d, h, M, s] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
            const updateList = ([...list, {id, value, y, m, d, h, M, s}]);
            setList(updateList);
            setValue('');
            setError('');
        }
    }

    return (<div className="app">
        <h1 className={styles['page-heading']}>Ввод значения</h1>
        <p className={styles['no-margin-text']}>
            Текущее значение <code>value</code>: "
            <output className={styles['current-value']}>{value}</output>
            "
        </p>
        {error !== '' ? <div className={styles.error}>{error}</div> : null}
        <div className={styles['buttons-container']}>
            <button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
            <button className={styles.button} disabled={!isValid} onClick={onAddButtonClick}>Добавить в список</button>
        </div>
        <div className={styles['list-container']}>
            <h2 className={styles['list-heading']}>Список:</h2>
            {list.length === 0 ? (<p className={styles['no-margin-text']}>Нет добавленных элементов</p>) : (
                <ul className={styles['list']}>
                    {list.map((item) => (<li className={styles['list-item']} key={item.id}>{item.value} -
                        добавлен{' '} {item.d.toString().padStart(2,'0')}.{item.m.toString().padStart(2,'0')}.{item.y} в {item.h.toString().padStart(2,'0')}:{item.M.toString().padStart(2,'0')}:{item.s.toString().padStart(2,'0')}</li>))}
                </ul>)}

        </div>
    </div>)
}