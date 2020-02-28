import { ButtonClickedCallback, ITodoListItem } from "../../../models";

export interface ISpFxHttpClientDemoProps {
  spListItems: ITodoListItem[];
  onGetListItems?: ButtonClickedCallback;
}
