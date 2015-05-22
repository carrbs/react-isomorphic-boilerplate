let React = require('react');
import {Link, RouteHandler} from 'react-router';


var App = React.createClass({
    render: function() {
        return (
            <div id="content">
                <Header />
                <nav>
                    <ul>
                        <li><Link to="index">Welcome</Link></li>
                        <li><Link to="page-1">Page 1</Link></li>
                        <li><Link to="page-2">Page 2</Link></li>
                    </ul>
                </nav>
                <section id="content">
                    <RouteHandler posts={this.props.data}/>
                </section>
            </div>
        );
    }
});

var Header = React.createClass({
    render: function() {
        return <div className="header">
            <section id="title">
                <h1>I'll get better at this</h1>
            </section>
        </div>
    }
  });


export default App;
