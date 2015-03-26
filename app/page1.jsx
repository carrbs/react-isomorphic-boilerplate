let React = require('react');

// you can use the traditional React.createClass technique for components
var Page1 = React.createClass({
    getInitialState: function() {
        return {counter: 0};
    },

    componentDidMount: function() {
        this._timer = setInterval(() => this.setState({counter: ++this.state.counter}), 1000);
    },

    componentWillUnmount: function() {
        clearInterval(this._timer);
        delete this._timer;
    },

    render: function() {
        return (
            <div>
                <h2>Page 1</h2>
                <p>Welcome to the first page of this website, and, obviously, the best.</p>
                <p>It's been {this.state.counter} seconds since this page loaded.</p>
                <Oscillator />
            </div>
        );
    }
});

var Oscillator = React.createClass({

    getInitialState () {
        return {oscillator: ''}
    },
    componentDidMount () {
        // create web audio api context
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // create Oscillator node
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.010;        

        oscillator.type = 'square';
        oscillator.frequency.value = 3000; // value in hertz

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        this.state.oscillator = oscillator;
    },
    start () {
        this.state.oscillator.start();     
    },
    stop () {
        this.state.oscillator.stop(); 
    },

    render () {
        return (
            <div className="oscillatorButtons">
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
            </div>
        );
    }
});
export default Page1;

