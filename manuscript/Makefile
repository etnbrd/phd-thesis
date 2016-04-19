FILE = main
NAME = thesis
PDFLATEX = mkdir -p .tmp && rsync -av -f"+ [0-9]*/" -f"- *" src/ .tmp/ && mkdir -p .tmp/figures && cd src && xelatex -shell-escape --output-directory ../.tmp ../src/${FILE}.tex && mv ../.tmp/${FILE}.pdf ../${NAME}.pdf && cd ..
# PDFLATEX = mkdir -p .tmp && rsync -av -f"+ [0-9]*/" -f"- *" src/ .tmp/ && mkdir -p .tmp/figures && cd src && pdflatex -shell-escape --output-directory ../.tmp ../src/${FILE}.tex && mv ../.tmp/${FILE}.pdf ../${NAME}.pdf && cd ..
BIBER = mkdir -p .tmp && cd .tmp && biber ${FILE} && cd ..


.PHONY: all, bib, _main, _bib

all: pdf bib open

bib: _bib
# bib: _bib _post

pdf: _pre

clean:
	rm -rf .tmp/*.aux

purge:
	rm -rf .tmp/

import:
	rsync -r ~/Documents/PhD/Bib/* ./src/bib

open:
	xdg-open ${NAME}.pdf

_pre:
	${PDFLATEX}

_bib:
	${BIBER}

_post:
	${PDFLATEX}