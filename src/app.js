function Important(props){
    let e = [];
    props.NotifyObj.forEach((data)=>{
        e.push(<li><a href={data.url}>{data.title}</a></li>)
    })
    return <p>{e}</p>
}


function Normal(props){
    let e = [];
    console.log(props.NotifyObj);
    props.NotifyObj.forEach((data)=>{
        e.push(<li>{data.date}</li>);
        data.contents.forEach((c)=>{
            e.push(<p className="NotifyDescription"><a href={c.url}>{c.title}</a></p>);
        })
    })
    return <p>{e}</p>
}

class Notify extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            importantNotifyContents: [],
            normalNotifyContents: []
        };
    }

    componentDidMount(){
        fetch(this.props.notifyStreamUrl)
        .then(res => res.json())
        .then(data =>{
            this.setState({
                importantNotifyContents : data["important"],
                normalNotifyContents : data["normal"]
            });
        })
    }

    render(){
        return(
            <div id="notify">
            <Important NotifyObj={this.state.importantNotifyContents} />
            <Normal NotifyObj={this.state.normalNotifyContents} />
            </div>
        );
    }
}

var root = document.getElementById('app');
var element = <Notify notifyStreamUrl="https://home.sweshelo.jp/notify.json" />;
ReactDOM.render(element, root);

