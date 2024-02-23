import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil
} from "draft-js";
import _ from "i18n";
import { getEditorToolbarConfig } from "Config";

class RichEditor extends Component {
  // command + A
  keyBindingFn = event => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 65) {
      return "selectAll";
    }
    return getDefaultKeyBinding(event);
  };

  // bug fix
  handleKeyCommand = command => {
    const { content, onEditorChange } = this.props;
    const currentContent = content.getCurrentContent();
    const firstBlock = currentContent.getBlockMap().first();
    const lastBlock = currentContent.getBlockMap().last();
    const firstBlockKey = firstBlock.getKey();
    const lastBlockKey = lastBlock.getKey();
    const lengthOfLastBlock = lastBlock.getLength();
    let selectionState = content.getSelection();
    let selection = selectionState.merge({
      anchorKey: firstBlockKey,
      anchorOffset: 0,
      focusKey: lastBlockKey,
      focusOffset: lengthOfLastBlock
    });

    if (command === "selectAll") {
      onEditorChange(EditorState.forceSelection(content, selection));
      return "handled";
    }
    return "not-handled";
  };

  // bug retour à la ligne
  handleReturn = () => {
    const { content, onEditorChange } = this.props;
    onEditorChange(RichUtils.insertSoftNewline(content));
    return "handled";
  };

  render() {
    const {
      lng,
      content,
      isExtraSlide,
      onEditorChange,
      toolbarClassName,
      editorClassName,
      mode
    } = this.props;
    return (
      <div className={`rich-editor-container`}>
        <div className={`rich-editor`}>
          <Editor
            toolbarClassName={
              isExtraSlide
                ? `toolbar extraslide ${toolbarClassName}`
                : `toolbar ${toolbarClassName}`
            }
            toolbar={getEditorToolbarConfig(mode, isExtraSlide)}
            editorState={content}
            onEditorStateChange={onEditorChange}
            placeholder={_("Vos remarques et contenu du slide ... ")}
            localization={{ locale: lng }}
            handlePastedText={() => false}
            editorClassName={`rich-editor__text-area  ${editorClassName} ${
              content.getCurrentContent().hasText() ? "filled-box" : "empty-box"
            }`}
            handleReturn={() => this.handleReturn()}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.keyBindingFn}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lng: state.params.lng
});

export default connect(mapStateToProps)(RichEditor);
