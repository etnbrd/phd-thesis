FILE = main
NAME = thesis
PDFLATEX = mkdir -p .tmp && cd src && pdflatex -shell-escape --output-directory ../.tmp ../src/${FILE}.tex && mv ../.tmp/${FILE}.pdf ../${NAME}.pdf && cd ..
BIBER = mkdir -p .tmp && cd .tmp && biber ${FILE} && cd ..

.PHONY: all, bib, _main, _bib

all: pdf bib open

bib: _bib _post

pdf: _pre

clean:
	rm -rf .tmp; rm -rf src/main-figure*

import:
	rsync -r ~/Documents/PhD/Bib ./src/bib

open:
	xdg-open ${NAME}.pdf

_pre:
	${PDFLATEX}

_bib:
	${BIBER}

_post:
	${PDFLATEX}