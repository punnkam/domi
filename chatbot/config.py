"""
Config changes per user
"""
from typing import NamedTuple


class UserSettings(NamedTuple):
    user_name: str


# Override this config to your own personal details.
USER_SETTINGS = UserSettings(
    user_name="Jonathon"
)