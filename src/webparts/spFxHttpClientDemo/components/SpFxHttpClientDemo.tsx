import * as React from "react";
import styles from "./SpFxHttpClientDemo.module.scss";
import { ISpFxHttpClientDemoProps } from "./ISpFxHttpClientDemoProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class SpFxHttpClientDemo extends React.Component<
  ISpFxHttpClientDemoProps,
  {}
> {
  // private onGetListItemsClicked = (
  //   event: React.MouseEvent<HTMLAnchorElement>
  // ): void => {
  //   event.preventDefault();
  //   this.props.onGetListItems();
  // };

  private onAddListItemClicked = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    this.props.onAddListItem();
  };

  private onUpdateListItemClicked = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    this.props.onUpdateListItem();
  };

  private onDeleteListItemClicked = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    this.props.onDeleteListItem();
  };

  public render(): React.ReactElement<ISpFxHttpClientDemoProps> {
    return (
      <div className={styles.spFxHttpClientDemo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.title}>List of Todo Items</p>
              {/* <a
                href="#"
                className={styles.button}
                onClick={this.onGetListItemsClicked}
              >
                <span className={styles.label}>Get Todo Items</span>
              </a> */}
              <a
                href="#"
                className={styles.button}
                onClick={this.onAddListItemClicked}
              >
                <span className={styles.label}>Add Todo Item</span>
              </a>
              <a
                href="#"
                className={styles.button}
                onClick={this.onUpdateListItemClicked}
              >
                <span className={styles.label}>Update Todo Item</span>
              </a>
              <a
                href="#"
                className={styles.button}
                onClick={this.onDeleteListItemClicked}
              >
                <span className={styles.label}>Delete Todo Item</span>
              </a>
            </div>
          </div>

          <div className={styles.row}>
            <ul className={styles.list}>
              {this.props.spListItems &&
                this.props.spListItems.map(list => (
                  <li key={list.Id} className={styles.item}>
                    <strong>Id:</strong> {list.Id}, <strong>Title:</strong>{" "}
                    {list.Title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
