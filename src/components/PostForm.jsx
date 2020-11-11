import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {createPost, hideAlert, showAlert} from "../redux/actions";
import {Alert} from "./Alert";

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
        };
    }

    submitHandler = (event) => {
        event.preventDefault();

        const { title } = this.state;

        if (!title.trim()) {
            return this.props.showAlert('Название поста не может быть пустым')
        }

        const newPost = {
            title,
            id: Date.now().toString(),
        };

        console.log(newPost);
        this.props.createPost(newPost);
        this.setState({ title: "" });
    };

    changeInputHandler = (event) => {
        if(this.state.title.length === 1) {
            this.props.hideAlert()
        }
        event.persist();
        this.setState((prev) => ({
            ...prev,
            ...{
                [event.target.name]: event.target.value,
            },
        }));
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                {this.props.alert && <Alert text={this.props.alert}/>}
                <div className="form-group">
                    <label htmlFor="title">Заголовок поста</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        name={"title"}
                        onChange={this.changeInputHandler}
                    />
                </div>
                <button className={"btn btn-success"} type={"submit"}>
                    Создать
                </button>
            </form>
        );
    }
}

// Какие actions нам нужно спроекцировать на свойсто для данного компонента (какие actions использовать в данном компоненте)
const mapDispatchToProps = {
    createPost, showAlert, hideAlert
};

const mapStateToProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
