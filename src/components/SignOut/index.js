import React from "react";
import Button from "@material-ui/core/Button";

import MainProvider from "../../state-management/providers/MainProvider";
import {MainContext} from "../../state-management/Context";
import {logout} from "../../helpers/login";

function SignOut() {
    return (
        <MainProvider>
            <MainContext.Consumer>
                {(context) => (
                    <Button
                        variant="contained"
                        style={{backgroundColor: "#3D9A04", color: "white"}}
                        onClick={() => logout()}
                    >
                        Sign Out
                    </Button>
                )}
            </MainContext.Consumer>
        </MainProvider>
    );
}

export default SignOut;
