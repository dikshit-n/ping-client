import { rbacConfig } from "src/config";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";
import { Authenticated } from "src/guard";
import { PingUserHomeContent } from "src/content/ping-user";

export const pingUserRoutes: ROUTES_DEFINITION = [
    {
        path: rbacConfig.homePage.ping_user,
        element: (
            <>
                <Helmet>
                    <title>Ping</title>
                </Helmet>
                <Authenticated roles={['ping_user']}>
                    <PingUserHomeContent />
                </Authenticated>
            </>
        )
    }
];