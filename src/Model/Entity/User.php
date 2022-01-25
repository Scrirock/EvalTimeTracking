<?php

namespace Scri\EvalTimeTracking\Model\Entity;

class User{

    private ?int $id;
    private string $username;
    private ?string $password;

    /**
     * User constructor.
     * @param int|null $id
     * @param string $username
     * @param string|null $password
     */
    public function __construct(string $username, ?string $password = null, ?int $id = null) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getUsername(): string {
        return $this->username;
    }

    /**
     * @param string $username
     * @return User
     */
    public function setUsername(string $username): User {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getPassword(): ?string {
        return $this->password;
    }

    /**
     * @param string|null $password
     * @return User
     */
    public function setPassword(?string $password): User {
        $this->password = $password;
        return $this;
    }

}