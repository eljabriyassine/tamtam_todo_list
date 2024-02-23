import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import styles from "./AssociationLegalForme.local.scss";
import CheckBox from "../../OrganizationList/CheckBox";
import { ICONS, SvgIcon } from "../Icons";
import { CHECKBOX_CHECKED, CHECKBOX_UNCHECKED } from "../../../config";
import { setGeneralAssociationDashboard } from "Actions";
import {
  fetchGeneralAssociationDashboard,
  fetchOrganizations,
  saveGeneralAssociationDashboard
} from "Thunks";

import _ from "i18n";
import { onSuccess, onError, getLabelsByLng } from "../../../utils";

class AssociationLegalForme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedIndex: ["STANDARD", "CREATED"]
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGeneralAssociationDashboard());
  }

  handleSubmitGeneralAssociationModal = () => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.setState({ loading: true });
    let associations = this.props.created;
    this.props.dispatch(saveGeneralAssociationDashboard({ associations })).then(
      res => {
        this.setState({ loading: false });
        this.props.handleDisabled(true);
        if (!this.props.isPage) {
          this.props.handleCancelAssociationModal();
        }
        onSuccess(res, {
          body: _("updateAssociationSuccess"),
          title: _("saveSuccess")
        });
        this.props.dispatch(fetchOrganizations(this.props.synchro));
      },
      err => {
        this.setState({ loading: false });
        if (!this.props.isPage) {
          this.props.handleCancelAssociationModal();
        }
        onError(err.response.data.errors[0].message);
      }
    );
  };

  renderAssociationCellule = (association, form, index) => {
    if (index === "CREATED") {
      return (
        <CheckBox
          state={
            association.data.includes(form)
              ? CHECKBOX_CHECKED
              : CHECKBOX_UNCHECKED
          }
          handleSelectCheckbox={() =>
            this.handleSetAssociation(form, association)
          }
        />
      );
    } else {
      return (
        association.data.includes(form) && (
          <span className={styles.cellule_check}>
            <SvgIcon icon={ICONS.CHECK} className={""} />
          </span>
        )
      );
    }
  };

  renderAssociationRow = (association, index) => {
    let { forms, lng } = this.props;

    var tdCheckBox = forms.map((form, i) => {
      return (
        <td key={association.id + "_" + (i + 1)}>
          {this.renderAssociationCellule(association, form, index)}
        </td>
      );
    });
    tdCheckBox.unshift(
      <td key={association.id + "_0"} className={styles.lef_header}>
        <span className={styles.cellule_th}>
          {getLabelsByLng(association.name, lng)}
          {/*{association.name[lng]}*/}
        </span>
      </td>
    );
    return tdCheckBox;
  };

  renderAssociationMatrice = (index, label, association) => {
    const { expandedIndex } = this.state;
    let { forms } = this.props;

    var header = forms.map((form, i) => {
      return <th key={index + "_th_" + (i + 1)}>{form}</th>;
    });
    header.unshift(<th key={index + "_th_0"}>Dasboards</th>);

    var rows = association.map((association, i) => {
      return (
        <tr className={styles.matrice_line} key={index + "_row_" + (i + 1)}>
          {this.renderAssociationRow(association, index)}
        </tr>
      );
    });

    return (
      <div>
        <div
          className={styles.association_header}
          onClick={() => this.handleToggleAssociationType(index)}
        >
          {_(label)}
          <img
            src={"/img/icons/dropdown_small_two_arrow.svg"}
            alt={""}
            className={classnames(
              styles.icon,
              expandedIndex.some(t => t === index)
                ? styles.expanded
                : styles.collapsed
            )}
          />
        </div>
        {association.length > 0 && (
          <div
            className={classnames(
              styles.association_matrice,
              expandedIndex.some(t => t === index)
                ? styles.matrice_expanded
                : styles.matrice_collapsed
            )}
          >
            <table className={styles.association_table}>
              <thead>
                <tr key={index + "_row_0"} className={styles.matrice_line}>
                  {header}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  handleCancelAssociationModal = () => {
    if (this.props.isPage) {
      this.props.handleClosePage();
    } else {
      this.props.handleCancelAssociationModal();
    }
  };

  handleToggleAssociationType = index => {
    const { expandedIndex } = this.state;
    if (expandedIndex.some(t => t === index)) {
      this.setState({
        expandedIndex: expandedIndex.filter(t => t !== index)
      });
    } else {
      this.setState({
        expandedIndex: [...expandedIndex, index]
      });
    }
  };

  handleSetAssociation = (form, association) => {
    let { created, standard, backOffice } = this.props;
    this.props.handleDisabled(false);

    let type = backOffice ? standard : created;

    let clonedCreatedAssociation = [...type];
    clonedCreatedAssociation.map(element => {
      let data = element.data;
      if (data.includes(form) && association.id === element.id) {
        data.splice(data.indexOf(form), 1);
        return element;
      }
      data.includes(form) && data.splice(data.indexOf(form), 1);
      association.id === element.id && data.push(form);
      return element;
    });

    this.props.dispatch(
      setGeneralAssociationDashboard(clonedCreatedAssociation)
    );
  };

  render() {
    const {
      created,
      standard,
      fetching,
      fetched,
      isPage,
      backOffice
    } = this.props;

    return (
      <div className={classnames(styles.associate_content)}>
        {isPage &&
          fetched && (
            <React.Fragment>
              <button
                className={classnames(styles.header_btn)}
                disabled={this.props.disabled}
                onClick={this.handleSubmitGeneralAssociationModal}
              >
                <img
                  src={"/img/icons/tail-spin.svg"}
                  alt={""}
                  className={this.state.loading ? styles.loading : ""}
                />
                {_("save")}
              </button>
            </React.Fragment>
          )}
        <div className={styles.labels_form_block}>
          {/*{fetching && <AssociationDashboardModalFetching />}*/}
          {fetching && (
            <div className={styles.ripple_loading_adapted}>
              <img src={"/img/Ripple-1s-150px.svg"} alt="" />
            </div>
          )}
          {fetched &&
            created.length > 0 &&
            this.renderAssociationMatrice(
              "CREATED",
              backOffice ? _("dashboardstandard") : _("dashboardcreated"),
              backOffice ? standard : created
            )}
          {fetched &&
            !backOffice &&
            this.renderAssociationMatrice(
              "STANDARD",
              _("dashboardstandard"),
              standard
            )}
        </div>
        <div className={styles.actions_block}>
          {!isPage ? (
            <React.Fragment>
              <button
                className={styles.cancel_btn}
                onClick={this.handleCancelAssociationModal}
              >
                {_("cancel")}
              </button>
              <button
                className={classnames(styles.save_button)}
                disabled={this.props.disabled}
                onClick={this.handleSubmitGeneralAssociationModal}
              >
                <img
                  src={"/img/icons/tail-spin.svg"}
                  alt={""}
                  className={this.state.loading ? styles.loading : ""}
                />
                {_("save")}
              </button>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
// Connected Component
const mapStateToProps = state => ({
  fetched: state.organizations.association.fetched,
  fetching: state.organizations.association.fetching,
  forms: state.organizations.association.forms,
  created: state.organizations.association.created,
  standard: state.organizations.association.standard,
  synchro: state.fiduciary.data && state.fiduciary.data.synchro,
  lng: state.params.lng,
  backOffice: state.params.backOffice
});

export default connect(mapStateToProps)(AssociationLegalForme);
