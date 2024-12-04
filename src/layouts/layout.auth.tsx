import LayoutAuth from "@/containers/LayoutAuth"
import { useVerifyUserInCookies } from "@/utils/hooks/useUser"

const LayoutAuthPage = ({ Component }: MODEL.LayoutProps) => {

    useVerifyUserInCookies()

    return (
        <>
            <LayoutAuth Component={Component} />
        </>
    )
}

export default LayoutAuthPage