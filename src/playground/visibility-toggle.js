let showDetails = false;

const onClickShowDetails = () => {
    showDetails = !showDetails;
    render();
}

const render = () => {
    const template = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={onClickShowDetails}>Show details</button>
            {showDetails && <p>Hey, these are some details that you can now see.</p>}
        </div>
    );

    ReactDOM.render(template, document.getElementById('app'));
}

render();