<?php

namespace Scri\EvalTimeTracking\Model\Entity;

class Project{

    private ?int $id;
    private string $fkUser;
    private string $name;

    /**
     * Project constructor.
     * @param string $name
     * @param string $fkUser
     * @param int|null $id
     */
    public function __construct(string $name, string $fkUser, ?int $id = null) {
        $this->id = $id;
        $this->fkUser = $fkUser;
        $this->name = $name;
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
    public function getName(): string {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Project
     */
    public function setName(string $name): Project {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getFkUser(): string {
        return $this->fkUser;
    }

    /**
     * @param string $fkUser
     * @return Project
     */
    public function setFkUser(string $fkUser): Project {
        $this->fkUser = $fkUser;
        return $this;
    }
}