<?php

namespace Scri\EvalTimeTracking\Model\Entity;

class Project{

    private ?int $id;
    private string $name;

    /**
     * Project constructor.
     * @param int|null $id
     * @param string $name
     */
    public function __construct(string $name, ?int $id = null) {
        $this->id = $id;
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

}