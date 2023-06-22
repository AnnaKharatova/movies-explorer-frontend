import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <div className="checkbox">
            <label className="checkbox__switch">
                <input type='checkbox' className='checkbox__input' />
                <span className="checkbox__slider" />
            </label>
            <p className="checkbox__item">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;





