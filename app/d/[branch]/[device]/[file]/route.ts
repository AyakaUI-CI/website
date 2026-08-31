import { NextResponse } from "next/server";


const GITLAB_PROJECT = "ruri%2Fayaka-releases";

const GITLAB_API =
    `https://gitlab.com/api/v4/projects/${GITLAB_PROJECT}`;

const GITLAB_DOWNLOAD =
    `${GITLAB_API}/packages/generic/builds`;



export async function GET(
    request: Request,
    {
        params
    }: {
        params: Promise<{
            branch: string;
            device: string;
            file: string;
        }>
    }
) {


    const {
        branch,
        device,
        file
    } = await params;


    try {


        /*
         * Validate OTA feed
         */
        const otaUrl =
            `https://raw.githubusercontent.com/AyakaUI/official_devices/${branch}/API/updater/${device}.json`;



        const otaResponse =
            await fetch(
                otaUrl,
                {
                    cache: "no-store"
                }
            );



        if (!otaResponse.ok) {

            return new NextResponse(
                "OTA feed not found",
                {
                    status: 404
                }
            );

        }



        const otaData =
            await otaResponse.json();



        const updates =
            Array.isArray(otaData)
            ? otaData
            : otaData.response || [];



        const latestBuild =
            updates[0];



        if (!latestBuild) {

            return new NextResponse(
                "Build metadata missing",
                {
                    status:404
                }
            );

        }



        const zip =
            latestBuild.files?.find(
                (item:any) =>
                    item.filename.endsWith(".zip")
            );



        if (!zip) {

            return new NextResponse(
                "ZIP missing",
                {
                    status:404
                }
            );

        }



        /*
         * Find latest GitLab package
         */

        const packageResponse =
            await fetch(
                `${GITLAB_API}/packages?package_name=builds&per_page=100`,
                {
                    cache:"no-store"
                }
            );



        if (!packageResponse.ok) {

            return new NextResponse(
                "GitLab package lookup failed",
                {
                    status:500
                }
            );

        }



        const packages =
            await packageResponse.json();



        const packageInfo =
            packages.find(
                (pkg:any) =>
                    pkg.version ===
                    zip.filename.replace(
                        /\.zip$/,
                        ""
                    )
            );



        if (!packageInfo) {

            return new NextResponse(
                "GitLab package not found",
                {
                    status:404
                }
            );

        }



        const gitlabUrl =
            `${GITLAB_DOWNLOAD}/${packageInfo.version}/${file}`;



        console.log(
            "[AyakaUI Download]",
            {
                device,
                file,
                package: packageInfo.version,
                url: gitlabUrl
            }
        );



        return NextResponse.redirect(
            gitlabUrl,
            302
        );



    } catch(error) {


        console.error(
            "[AyakaUI Redirect Error]",
            error
        );


        return new NextResponse(
            "Internal Server Error",
            {
                status:500
            }
        );

    }

}
