import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './AddOption.js';
import Options from './Options.js';
import Action from './Action.js';
import Header from './Header.js';
import OptionModal from './OptionModal.js';

export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            selectedOption: undefined
        };
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.clearSelectedOption = this.clearSelectedOption.bind(this);
    }

    clearSelectedOption() {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }

    componentDidMount() {
        console.log('Loading Data');
        try {
            const options = JSON.parse(localStorage.getItem('options'));
            if(options) {
                this.setState(() => ({
                    options
                }));
            }
        } catch (error) {
            // Do Nothing
            console.log('Error While Loading Data', error);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('saving data');
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('saving data');
        }
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        console.log(randomNum);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    }

    handleAddOption(option) {
        if(this.state.options.some((opt) => option === opt)) {
            return "Duplicate Option";
        }
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        });
    }

    handleDeleteOptions() {
        this.setState((prevState) => {
            return {
                options: []
            }
        });
    }

    handleDeleteOption(removedOption) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== removedOption)
        }));
    }

    render() {
        const title = 'Indecsion';
        const subtitle = 'Put your life in the hands of a machine';
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0} 
                        handlePick={this.handlePick}
                    /> 
                    <div className="widget">
                        <Options 
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption} />
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    clearSelectedOption={this.clearSelectedOption}
                />
            </div>
        );
    }
}
//DEfault props for Indecision App
IndecisionApp.defaultProps = {
    options: []
}
