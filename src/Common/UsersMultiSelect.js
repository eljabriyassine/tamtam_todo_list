import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { components as selectComponents } from "react-select";
import AsyncSelect from "react-select/lib/Async";

import { TTP_API_URL } from "Config";
import { fetchUsersSuggestions } from "Thunks";

const Input = props => {
  if (props.isHidden) {
    return <selectComponents.Input {...props} />;
  }
  return (
    <div>
      <selectComponents.Input {...props} />
    </div>
  );
};

const MultiValueLabel = ({ children, ...props }) => {
  const { avatar, firstName } = props.data;

  const style = {
    display: "flex",
    alignItems: "center"
  };

  const avatarStyle = {
    backgroundColor: "#CCC",
    backgroundImage: avatar && `url('${TTP_API_URL}/${avatar}')`,
    width: "20px",
    height: "20px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    flexShrink: "0",
    marginRight: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    color: "#000"
  };

  return (
    <selectComponents.MultiValueLabel {...props}>
      <div style={style}>
        <span style={avatarStyle}>
          {!avatar && firstName && firstName.charAt(0)}
        </span>
        {children}
      </div>
    </selectComponents.MultiValueLabel>
  );
};

const Option = props => {
  const { children, ...rest } = props;
  const { avatar, firstName } = rest.data;

  const style = {
    display: "flex",
    alignItems: "center"
  };

  const avatarStyle = {
    backgroundColor: "#EEE",
    backgroundImage: avatar && `url('${TTP_API_URL}/${avatar}')`,
    width: "30px",
    height: "30px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    flexShrink: "0",
    marginRight: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1rem",
    textTransform: "uppercase",
    color: "#000"
  };

  const withAvatarChildren = (
    <div style={style}>
      <span style={avatarStyle}>
        {!avatar && firstName && firstName.charAt(0)}
      </span>
      {children}
    </div>
  );

  return <selectComponents.Option {...rest} children={withAvatarChildren} />;
};

export class UsersMultiSelect extends PureComponent {
  loadUsersSuggestions = inputValue => {
    return this.props
      .fetchUsersSuggestions({ search: inputValue })
      .then(result => result.value.data.data);
  };

  render() {
    const { users, onChange } = this.props;
    return (
      <AsyncSelect
        value={users}
        isMulti={true}
        onChange={onChange}
        loadOptions={this.loadUsersSuggestions}
        defaultOptions={true}
        getOptionLabel={option => `${option.firstName} ${option.lastName}`}
        getOptionValue={option => option.id}
        components={{ Option, MultiValueLabel, Input }}
        classNamePrefix="media-user-multi-select"
      />
    );
  }
}

// Connected Component
const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  fetchUsersSuggestions: options => dispatch(fetchUsersSuggestions(options))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersMultiSelect);
