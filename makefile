VERSION := $(shell cat VERSION)


git-tag:
	git tag "v$(VERSION)"

git-release:
	git push
	git push --tags

docker-build:
	docker build -t biolachs2/lab_orchestrator_novnc:v$(VERSION) .
	docker build -t biolachs2/lab_orchestrator_novnc:latest .

docker-push:
	docker push biolachs2/lab_orchestrator_novnc:v$(VERSION)
	docker push biolachs2/lab_orchestrator_novnc:latest

release: docker-build git-tag docker-push git-release

