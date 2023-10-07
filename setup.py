from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in inventeam_manufacturing_app/__init__.py
from inventeam_manufacturing_app import __version__ as version

setup(
	name="inventeam_manufacturing_app",
	version=version,
	description="Frappe / ERPNext APP",
	author="Inventeam Solutions Pvt. Ltd.",
	author_email="support@inventeam.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
