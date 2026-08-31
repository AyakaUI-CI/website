import { NextResponse } from "next/server";


const GITLAB_PROJECT =
  "ruri%2Fayaka-releases";


const GITLAB_BASE =
  `https://gitlab.com/api/v4/projects/${GITLAB_PROJECT}/packages/generic/builds`;



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


    // Mantém validação pelo feed OTA
    const otaUrl =
      `https://raw.githubusercontent.com/AyakaUI/official_devices/${branch}/API/updater/${device}.json`;



    const response =
      await fetch(
        otaUrl,
        {
          cache: "no-store"
        }
      );



    if (!response.ok) {

      return new NextResponse(
        "OTA feed not found",
        {
          status: 404
        }
      );

    }



    const data =
      await response.json();



    const updates =
      Array.isArray(data)
      ? data
      : data.response || [];



    const otaFile =
      updates
        .flatMap(
          (item: any) => item.files || []
        )
        .find(
          (item: any) =>
            item.filename === file
        );



    if (!otaFile) {

      return new NextResponse(
        "Build not found",
        {
          status: 404
        }
      );

    }



    /*
     * GitLab Generic Package:
     *
     * package version = filename sem .zip
     *
     * Ex:
     * AyakaUI_fogos-GAPPS-17.0-20260830-1823
     */

    const packageVersion =
      file.replace(
        /\.zip$/,
        ""
      );



    const gitlabUrl =
      `${GITLAB_BASE}/${packageVersion}/${file}`;



    console.log(
      "[AyakaUI Download]",
      {
        branch,
        device,
        file,
        gitlabUrl
      }
    );



    return NextResponse.redirect(
      gitlabUrl,
      302
    );



  } catch(error) {


    console.error(
      "[AyakaUI Download Redirect]",
      error
    );


    return new NextResponse(
      "Internal Server Error",
      {
        status: 500
      }
    );


  }

}
