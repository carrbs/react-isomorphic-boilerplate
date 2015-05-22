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
                <h2>Oscillator</h2>
                <p>This is how not to make an oscillator. Enjoy!
                    <Oscillator />
                </p>
                <PeriodicWave />
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

var PeriodicWave = React.createClass({
    getInitialState () {
        return {oscillator: ''}
    },

    start() {

        var real = new Float32Array(2);
        var imag = new Float32Array(2);
        var ac = new AudioContext();
        var osc = ac.createOscillator();
        this.state.oscillator = osc

        real[0] = 1;
        imag[0] = 0;
        real[1] = 1;
        imag[1] = 0;

        var wave = ac.createPeriodicWave(real, imag);

        osc.setPeriodicWave(wave);

        osc.connect(ac.destination);

        osc.start();
    },

    stop () {
        this.state.oscillator.stop();
    },

    increase () {
        this.state.oscillator.frequency.value = 3000
    },

    render () {
        return <div>
            <h2>Periodic Wave {this.state.oscillator && <span>(Hz: {this.state.oscillator.frequency.value})</span>}</h2>
            <p>This might be how to make a periodic wave. Enjoy!
                <div className="wavyButtons">
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.increase}>Increase</button>
                </div></p>
        </div>
    }
});

export default Page1;
