import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "SpFxHttpClientDemoWebPartStrings";
import SpFxHttpClientDemo from "./components/SpFxHttpClientDemo";
import { ISpFxHttpClientDemoProps } from "./components/ISpFxHttpClientDemoProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ITodoListItem } from "../../models";

export default class SpFxHttpClientDemoWebPart extends BaseClientSideWebPart<
  any
> {
  private _todoItems: ITodoListItem[] = [];

  public render(): void {
    const element: React.ReactElement<ISpFxHttpClientDemoProps> = React.createElement(
      SpFxHttpClientDemo,
      {
        spListItems: this._todoItems,
        onGetListItems: this._onGetListItems
      }
    );

    ReactDom.render(element, this.domElement);
    this._onGetListItems();
  }

  private _onGetListItems = (): void => {
    this._getListItems().then(response => {
      this._todoItems = response;
      this.render();
    });
  };

  private _getListItems(): Promise<ITodoListItem[]> {
    return this.context.spHttpClient
      .get(
        this.context.pageContext.web.absoluteUrl +
          `/_api/web/lists/getbytitle('Todo')/items?$select=Id,Title`,
        SPHttpClient.configurations.v1
      )
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.value;
      }) as Promise<ITodoListItem[]>;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
