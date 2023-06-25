import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <section className="checkbox">

            <label className="checkbox__switch" htmlFor='checkbox'>
                
                <input type='checkbox' id='checkbox' className='checkbox__input' />
                <span className="checkbox__slider" />
                <span className="checkbox__item">Короткометражки</span>
            </label>

        </section>
    );
}

export default FilterCheckbox;





