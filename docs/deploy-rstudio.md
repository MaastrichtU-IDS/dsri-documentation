---
id: deploy-rstudio
title: Deploy RStudio
---

[![RStudio](/dsri-documentation/img/rstudio_logo.png)](https://rstudio.com/)

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) or request new ones by creating a [new issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues).

---

Use [rocker/rstudio](https://hub.docker.com/r/rocker/rstudio/) Docker image.

* Image name:
  
  ```
  rocker/rstudio
  ```

* Environment variables:
  * `ROOT` : `TRUE`
  * `PASSWORD` : `my_password`
* Mounted path: `/home` (rstudio files goes to `/home/rstudio`)

> Username: `rstudio`

> Network port: `8787`
