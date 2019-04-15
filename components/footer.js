
const React = require('react');

class CustomComponent extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div className="parametric-footer">
        <div>
          <img src="/static/images/logo-bg-dark.png" />
          <div>
            About the Parametric Press
          </div>
          <div>
            <a href="https://twitter.com/parametricpress">Follow us on Twitter</a>
          </div>
        </div>
        <div>
          <form
            style={{
              padding: 3
            }}
            action="https://tinyletter.com/parametricpress"
            method="post"
            target="popupwindow"
            onSubmit="window.open('https://tinyletter.com/parametricpress', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
            <label htmlFor="tlemail" style={{fontSize: 23}}>
              Subscribe to our newsletter
            </label>
            <br/>
            <input type="text" style={{width: 300, margin: '1em 0'}} name="email" id="tlemail" placeholder="Email address" />
            <br/>
            <input type="hidden" value="1" name="embed"/>
            <input style={{width: 300}} type="submit" value="Subscribe" />
          </form>
        </div>
      </div>
    );
  }
}

module.exports = CustomComponent;
