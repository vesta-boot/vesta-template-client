import { CrudMenu, Navbar, PageTitle } from "@vesta/components";
import { Culture } from "@vesta/culture";
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";
import { getAcl } from "../../service/Acl";
import { transitionTo } from "../../service/transitionTo";
import { IBaseComponentWithRouteProps } from "../BaseComponent";
import { UserAdd } from "./user/UserAdd";
import { UserDetail } from "./user/UserDetail";
import { UserEdit } from "./user/UserEdit";
import { UserList } from "./user/UserList";

interface IUserParams {
}

interface IUserProps extends IBaseComponentWithRouteProps<IUserParams> {
}

interface IUserState {
}

export class User extends Component<IUserProps, IUserState> {

    private access = getAcl().getAccessList("user");;
    private tr = Culture.getDictionary().translate;


    constructor(props: IUserProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { add, edit } = this.access;
        const addUser = add ?
            <Route path="/user/add" render={transitionTo(UserAdd, { user: ["add"] })} /> : null;
        const editUser = edit ?
            <Route path="/user/edit/:id" render={transitionTo(UserEdit, { user: ["edit"] })} /> : null;

        return (
            <div className="page user-page has-navbar">
                <PageTitle title={this.tr("mdl_user")} />
                <Navbar title={this.tr("mdl_user")} showBurger={true} />
                <h1>{this.tr("users")}</h1>
                <CrudMenu path="user" access={this.access} />

                <div className="crud-wrapper">
                    <HashRouter>
                        <Switch>
                            {addUser}
                            {editUser}
                            <Route path="/user/detail/:id" render={transitionTo(UserDetail, { user: ["read"] })} />
                        </Switch>
                    </HashRouter>
                    <UserList access={this.access} />
                </div>
            </div>
        );
    }
}